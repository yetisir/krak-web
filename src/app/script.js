import VtkView from '@/components/VtkView';
import RemoteRenderingView from '@/components/RemoteRenderingView';
import ProgressBar from '@/components/ProgressBar';
import NavigationDrawer from '@/components/NavigationDrawer';
import CodeEditor from '@/components/CodeEditor';
import GitPipeline from '@/components/GitPipeline';
import AppBar from '@/components/AppBar';
import ObjectGraph from '@/components/ObjectGraph';

export default {
  name: 'App',
  components: {
    VtkView,
    RemoteRenderingView,
    ProgressBar,
    NavigationDrawer,
    CodeEditor,
    AppBar,
    GitPipeline,
    ObjectGraph,
  },
  computed: {
    client() {
      return this.$store.getters.NETWORK_CLIENT;
    },
    busyPercent() {
      return this.$store.getters.BUSY_PROGRESS;
    },
  },
  watch: {
    client() {
      // Setup view for remote rendering
      this.$store.dispatch('VIEW_REMOTE_RENDERING_SETUP');

      // // This only happen once when the connection is ready
      // this.$store.dispatch('VTK_INITIALIZE');
    },
  },

  mounted() {
    // Register view to the store
    this.$store.commit('VIEW_PROXY_SET', this.$refs.vtkViewComponent.view);

    // Initiate network connection
    const host = process.env.VUE_APP_SERVER_HOST;
    const port = process.env.VUE_APP_RENDER_SERVER_PORT;
    const config = {
      application: 'code',
      sessionURL: `ws://${host}:${port}/ws`,
    };
    this.$store.commit('NETWORK_CONFIG_SET', config);
    this.$store.dispatch('NETWORK_CONNECT');

    setInterval(() => this.$store.dispatch('BUSY_UPDATE_PROGRESS', 1), 50);
  },
};
