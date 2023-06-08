pipeline {
    agent any 

    stages{

        stage('build da imagem docker'){
            steps{
                sh 'docker build -t devops/app .'
            }        
        }
        stage('subir docker compose - redis e app'){
            steps{
                sh 'docker-compose up --build -d'
            }  
        }
        stage('sleep para subida dos container'){
            steps{
                sh 'sleep 10'
            }  
        }
        stage('Sonarqube validation'){
            steps{
                script{
                    scannerHome = tool 'sonar-scanner';
                }
                withSonarQubeEnv('sonar-server'){
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=redis-app -Dsonar.sources=. -Dsonar.host.url=${env.SONAR_HOST_URL} -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
                }
            }
        }
        stage('Quality Gate'){
            steps{
                waitForQualityGate abortPipeline: true
            }
        }
        stage('teste de aplicação'){
            steps{
                sh 'chmod +x teste-app.sh'
                sh './teste-app.sh'
            }  
        }  
        stage('shut down docker-compose'){
            steps{
                sh 'docker-compose down'
            }  
        }
        stage('upload docker images'){
            steps{
                script{
                    withCredentials([usernamePassword(credentialsId: 'nexus-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSSWORD')]){
                        sh 'docker login -u $USERNAME -p $PASSSWORD ${NEXUS_URL}'
                        sh 'docker tags devops/app:latest ${NEXUS_URL}/devops/app'
                        sh 'docker push ${NEXUS_URL}/devops/app'
                    }
                }
            }
        }

    }
}
