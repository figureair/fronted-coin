#!/usr/bin/groovy

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
                echo "packge code"
                sh "npm run build"
            }
        }
        stage("deploy"){
            steps{
                echo "deploy packge to node1"
            }
        }
    }
}