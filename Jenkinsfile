pipeline {
    agent any
    tools{
      nodejs '21.6.1'
    }

    stages {
        stage('Build') {
            steps {
                 sh "npm version"
            }
        }
    }
}
