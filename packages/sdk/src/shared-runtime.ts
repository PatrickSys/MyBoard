type SharedSdkRuntime = {
  bridge: unknown;
  commandHandlers: Map<string, unknown>;
  instances: Map<string, unknown>;
};

type GlobalWithSdkRuntime = typeof globalThis & {
  __MYBOARD_SDK_RUNTIME__?: SharedSdkRuntime;
};

function createSharedRuntime(): SharedSdkRuntime {
  return {
    bridge: {},
    commandHandlers: new Map<string, unknown>(),
    instances: new Map<string, unknown>(),
  };
}

export function getSharedSdkRuntime(): SharedSdkRuntime {
  const root = globalThis as GlobalWithSdkRuntime;
  if (!root.__MYBOARD_SDK_RUNTIME__) {
    root.__MYBOARD_SDK_RUNTIME__ = createSharedRuntime();
  }
  return root.__MYBOARD_SDK_RUNTIME__;
}
