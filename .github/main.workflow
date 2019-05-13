workflow "publish on release" {
  on = "push"
  resolves = ["publish"]
}

action "publish" {
  uses = "actions/npm@master"
  runs = "publish"
  secrets = ["NPM_PUBLISH_TOKEN"]
}
