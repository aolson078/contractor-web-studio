export function getContactPrefill(search = '') {
  const params = new URLSearchParams(search);
  const packageValue = params.get('package')?.trim() ?? '';
  const serviceValue = params.get('service')?.trim() ?? '';
  const rawAddons = params.get('addons') ?? '';
  const addons = rawAddons
    .split(',')
    .map((addon) => addon.trim())
    .filter(Boolean);

  return { package: packageValue, service: serviceValue, addons };
}
