export function getInstance(): Promise<string | null> {
  const urlParams = new URLSearchParams(window.location.search);
  return Promise.resolve(urlParams.get('instance'));
}
