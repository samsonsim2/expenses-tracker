pipeline {
    agent any
    tools{
      nodejs '21.6.1'
    }

     
    stages {
        stage('Build artifact') {
            steps {
                 sh "npm install"
                 sh "npm run build"
            }
        }

      stage('Build image') {
            steps {
                echo "building the docker image..."
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh 'docker build -t samsonsim2/expenses-frontend:expenses-1.0 .'
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh 'docker push samsonsim2/expenses-frontend:expenses-1.0'
                }

            }
        }
   
    }
  
     
        
}
