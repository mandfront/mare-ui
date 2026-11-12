/**
 * Formato das entradas do CHANGELOG. É o padrão do Changesets sem o hash do
 * commit: com merge por squash, o commit em que o changeset foi criado não
 * existe no `main`, e o hash apontaria para lugar nenhum.
 */
export default {
  getReleaseLine: (changeset) => {
    const [firstLine, ...otherLines] = changeset.summary.split('\n').map((line) => line.trimEnd());
    return [`- ${firstLine}`, ...otherLines.map((line) => `  ${line}`)].join('\n');
  },
  getDependencyReleaseLine: (_changesets, dependenciesUpdated) => {
    if (dependenciesUpdated.length === 0) return '';
    return [
      '- Dependências atualizadas:',
      ...dependenciesUpdated.map((dependency) => `  - ${dependency.name}@${dependency.newVersion}`),
    ].join('\n');
  },
};
