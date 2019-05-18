workflow "build and test" {
  on = "push"
  resolves = ["build", "cover"]
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "build" {
  needs = "install"
  uses = "actions/npm@master"
  args = "run build"
}

action "cover" {
  needs = "install"
  uses = "actions/npm@master"
  args = "run cover"
}

action "report-coverage" {
  needs = "install"
  uses = "actions/npm@master"
  args = "run report-coverage"
}

action "upload-coverage" {
  needs = "install"
  uses = "actions/npm@master"
  args = "run codecov"
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
