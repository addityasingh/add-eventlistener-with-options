workflow "build and test" {
  on = "push"
  resolves = ["build", "test"]
}

action "test" {
  uses = "actions/npm@master"
  args = "test"
}

action "build" {
  uses = "actions/npm@master"
  args = "build"
}

workflow "publish on release" {
  on = "release"
  resolves = ["publish"]
}

action "publish" {
  needs = "build"
  uses = "actions/npm@master"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}
