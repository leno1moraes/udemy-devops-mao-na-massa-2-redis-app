pipeline {
    agent any 
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
    stage('teste de aplicação'){
        steps{
            sh 'teste-app.sh'
        }  
    }     

}