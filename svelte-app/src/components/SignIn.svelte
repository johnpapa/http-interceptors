<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { ButtonFooter } from '../components';
  import * as sessionService from '../shared/session.service';

  const captains = console;

  // private subs = new Subscription();
  let email = 'john@contoso.com';
  let password = '1234';

  // onMount(async () => await getHeroes());

  // let sessionService; //: SessionService,
  //   private route: ActivatedRoute,
  //   private router: Router,

  const cancelOptions = {
    className: 'card-footer-item cancel-button',
    label: 'Cancel',
    iconClasses: 'fas fa-undo',
  };

  const saveOptions = {
    className: 'card-footer-item save-button',
    label: 'Sign in',
    iconClasses: 'fas fa-sign-in-alt',
  };

  function isLoggedIn(): boolean {
    return true;
    // return sessionService.isLoggedIn;
  }

  async function signin() {
    let response = await sessionService.signin(this.email, this.password);
    //     .pipe(
    //       mergeMap((result) => this.route.queryParams),
    //       map((qp) => qp['redirectTo']),
    //     )
    //     .subscribe((redirectTo) => {
    //       if (this.sessionService.isLoggedIn) {
    //         captains.info(`Successfully logged in`);
    //         const url = redirectTo ? [redirectTo] : ['/home'];
    //         this.router.navigate(url);
    //       }
    //     }),
    // );
  }

  function cancel() {
    navigate('/home');
  }
</script>

<div class="card signin">
  <header class="card-header">
    <p class="card-header-title">Sign In</p>
  </header>
  <div class="card-content">
    <div class="content">
      <div class="field">
        <label class="label" for="email"> email </label>
        <input
          name="email"
          class="input"
          type="email"
          bind:value={email}
          placeholder="e.g. john@contoso.com"
        />
      </div>
      <div class="field">
        <label class="label" for="password"> Password </label>
        <input
          name="password"
          class="input"
          type="password"
          bind:value={password}
          placeholder="1234"
        />
      </div>
    </div>
  </div>
  <footer class="card-footer ">
    <ButtonFooter {...cancelOptions} on:clicked={cancel} />
    <ButtonFooter {...saveOptions} on:clicked={signin} />
  </footer>
</div>
