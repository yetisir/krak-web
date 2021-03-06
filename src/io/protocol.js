export default function createApi({ commit, dispatch }) {
  return (session) => {
    // Code API
    session.subscribe('code.set_status', (status) => {
      commit('CODE_STATUS_SET', status);
      dispatch('VTK_RESET_CAMERA');
    });

    return {
      // Code API
      runCode: (code) => session.call('code.run', [code]),
      stopCode: () => session.call('code.stop', []),
      getCode: () => session.call('code.get', []),
      pushOutput: () => session.call('code.push_output', []),

      // Data API
      getObjects: () => session.call('data.get_objects', []),

      // VTK API
      resetCamera: () => session.call('vtk.reset_camera', []),
      setBackground: (dark) => session.call('vtk.set_background', [dark]),
    };
  };
}
