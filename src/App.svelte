<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
</script>

<Router>
  <nav>
    <Link to="/zt">ホーム</Link>
  </nav>
  <main>
    <h1>Zoom字幕</h1>
    <Route path="/zt" component={Home} />
  </main>
  <style lang="sass">

  </style>
</Router>
