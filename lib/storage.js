import { APP_CONFIG, DEFAULT_SETTINGS_FILE, LOCAL_ORDERS_FILE, LOCAL_RESULTS_FILE, LOCAL_SETTINGS_FILE, hasSupabase, readJsonFile, writeJsonFile } from './config.js';

const SETTINGS_KEY = 'store_settings';

async function supabaseFetch(tableOrPath, { method = 'GET', query = '', body, headers = {} } = {}) {
  const target = tableOrPath.startsWith('/') ? tableOrPath : `/rest/v1/${tableOrPath}${query}`;
  const response = await fetch(`${APP_CONFIG.supabaseUrl}${target}`, {
    method,
    headers: {
      apikey: APP_CONFIG.supabaseServiceRoleKey,
      Authorization: `Bearer ${APP_CONFIG.supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase error: ${response.status} ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function getDefaultSettings() {
  return readJsonFile(DEFAULT_SETTINGS_FILE, { site: {}, bank: {}, telegram: {}, courses: [] });
}

export async function getSettings() {
  if (hasSupabase()) {
    const rows = await supabaseFetch(`app_settings?select=value&key=eq.${encodeURIComponent(SETTINGS_KEY)}&limit=1`);
    if (rows && rows[0]?.value) return rows[0].value;
    const defaults = await getDefaultSettings();
    await saveSettings(defaults);
    return defaults;
  }

  const defaults = await getDefaultSettings();
  const local = await readJsonFile(LOCAL_SETTINGS_FILE, null);
  return local || defaults;
}

export async function saveSettings(settings) {
  if (hasSupabase()) {
    const rows = await supabaseFetch('app_settings', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: [{ key: SETTINGS_KEY, value: settings }]
    });
    return rows?.[0]?.value || settings;
  }

  await writeJsonFile(LOCAL_SETTINGS_FILE, settings);
  return settings;
}

export async function createOrder(order) {
  if (hasSupabase()) {
    const rows = await supabaseFetch('orders', {
      method: 'POST',
      body: [order]
    });
    return rows?.[0] || order;
  }

  const list = await readJsonFile(LOCAL_ORDERS_FILE, []);
  list.unshift(order);
  await writeJsonFile(LOCAL_ORDERS_FILE, list);
  return order;
}

export async function listOrders() {
  if (hasSupabase()) {
    return supabaseFetch('orders?select=*&order=created_at.desc');
  }
  return readJsonFile(LOCAL_ORDERS_FILE, []);
}

export async function createQuizResult(result) {
  if (hasSupabase()) {
    const rows = await supabaseFetch('quiz_results', {
      method: 'POST',
      body: [result]
    });
    return rows?.[0] || result;
  }

  const list = await readJsonFile(LOCAL_RESULTS_FILE, []);
  list.unshift(result);
  await writeJsonFile(LOCAL_RESULTS_FILE, list);
  return result;
}

export async function listQuizResults() {
  if (hasSupabase()) {
    return supabaseFetch('quiz_results?select=*&order=created_at.desc');
  }
  return readJsonFile(LOCAL_RESULTS_FILE, []);
}
