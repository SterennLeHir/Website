pipeline {
    agent none
    stages {
        stage('Install Dependencies') {
            agent {
                docker { image 'node:20.11.1-alpine3.19' }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Back-end') {
            agent {
                docker { image 'node:20.11.1-alpine3.19' }
            }
            steps {
                sh 'node --version'
                // Ajoutez ici les commandes pour construire et tester votre back-end
            }
        }
        stage('Front-end') {
            agent {
                docker { image 'node:20.11.1-alpine3.19' }
            }
            steps {
                sh 'node --version'
                // Ajoutez ici les commandes pour construire et tester votre front-end
            }
        }
        stage('Build') {
            agent {
                docker { image 'node:20.11.1-alpine3.19' }
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            agent {
                docker { image 'node:20.11.1-alpine3.19' }
            }
            steps {
                sh 'npm run test'
            }
        }
    }
}