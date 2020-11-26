# serverless-plugin-scripts example



### Hooks

- package:cleanup
- package:initialize
- package:setupProviderConfiguration
- package:createDeploymentArtifacts
- package:compileFunctions
- package:compileEvents
- package:finalize
- before:deploy:deploy
- aws:deploy:deploy:createStack
- aws:deploy:deploy:checkForChanges
- aws:deploy:deploy:uploadArtifacts
- aws:deploy:deploy:validateTemplate
- aws:deploy:deploy:updateStack
- aws:deploy:finalize:cleanup
- remove:remove
- invoke:invoke
- metrics:metrics