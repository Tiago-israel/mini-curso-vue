export async function buscarRepositorio(nomeRepositorio) {
  const response = await fetch(
    `https://api.github.com/repos/${nomeRepositorio}`
  );
  if (response.status === 200) {
    const repositorio = await response.json();
    return repositorio;
  }
  return undefined;
}
