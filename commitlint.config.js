/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', 'kebab-case'],
  },
  // Os commits do Dependabot trazem linhas longas no corpo (tabelas de versões).
  ignores: [(message) => message.includes('Signed-off-by: dependabot[bot]')],
};
