Here are all the adjustment I had to make to get your [YouTube example](https://www.youtube.com/watch?v=bJTz7h3o44I) up and running:

### .eslintrc.js

If you insist to use the absurdly modern syntax of vuex-orm you would have to set `parserOptions.ecmaVersion` to `latest`. `2021` doesn't cut it.

Another option is to rewrite (for example)

```js
static entity = 'users';
```

to

```js
static get entity() {
  return 'users';
}
```

Both work fine.

### src/store/QuasarVuexOrmPlugin.js

`require.context(...)` doesn't work with Vite out of the box. But there is a Vite plugin that makes the problem go away: [@originjs/vite-plugin-require-context](https://www.npmjs.com/package/@originjs/vite-plugin-require-context).

You would add it as usual in `quasar.config.js`.

Require it somewhere at the top (note the .default at the end of the line)...

```js
const ViteRequireContext = require('@originjs/vite-plugin-require-context').default;
```

and execute it in the `vitePlugins` array:

```js
vitePlugins: [[ViteRequireContext()]];
```

You also have to change the path slightly by adding a slash at the beginning. `/src/models` vs. `src/models`:

```js
const modelFileContext = require.context('/src/models', false, /\.js$/);
```

An alternative might be to use [Glob Imports](https://vitejs.dev/guide/features.html#glob-import). But I don't know how well that would work with Webpack.

### @vuemodel/supabase

As long as the package isn't compiled as an ES module you have to import `@vuemodel/supabase` bypassing the bundle in the dist folder entirely.

Like so:

```js
import { useModelCollection } from '@vuemodel/supabase/src/main';
```

(Which I don't understand, because Vite should be able to deal with CommonJS modules just fine, right?).
