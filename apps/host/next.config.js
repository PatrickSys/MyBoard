//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

function shouldUseNxPlugin() {
  return Boolean(
    process.env.NX_TASK_TARGET_PROJECT ||
      process.env.NX_TASK_TARGET_TARGET ||
      process.env.NX_WORKSPACE_ROOT ||
      process.env.NX_CLI_SET
  );
}

module.exports = shouldUseNxPlugin() ? composePlugins(...plugins)(nextConfig) : nextConfig;
