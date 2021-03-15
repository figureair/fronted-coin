
pipeline{
    agent any
    stages{
        stage("getcode"){
           steps{
               echo "get code from scm"
               checkout scm
           }
        }
        stage("package"){
            steps{
                echo "build start"
                sh "npm install"
                sh "rm -rf ./dist/*"
                sh "npm run build"
                sh "tar -zcvf dist.tar.gz *"
                echo "build success"
            }
        }
        stage("deploy"){
            steps{
                echo "deploy packge to fronted"
                sh "rm -rf /usr/local/fronted/*"
                echo "deploy success"
            }
        }
    }
}