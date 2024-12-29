# .platform/hooks/prebuild/01_yarn_install.sh
#!/bin/bash
#set -e
#curl -o- -L https://yarnpkg.com/install.sh | bash
#export PATH="$HOME/.yarn/bin:$PATH"
#yarn install
#!/bin/bash
cd /var/app/staging
yarn install --frozen-lockfile