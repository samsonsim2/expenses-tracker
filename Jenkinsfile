pipeline {
    agent any
    tools{
      nodejs '21.6.1'
    }

    environment { 
        CI = 'false'
    }

    stages {
        stage('Build artifact') {
            steps {
                 sh "npm run ng -- build"
            }
        }

      stage('Build image') {
            steps {
                echo "building the docker image..."
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh 'docker build -t samsonsim2/expenses-frontend:test-1.0 .'
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh 'docker push samsonsim2/expenses-frontend:test-1.0'
                }

            }
        }
   
    }
  
     
        
}
