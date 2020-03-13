export default function({ app, $auth }) {
  $auth.onRedirect((to, from) => {
    to = app.localePath(to)
  })
}
