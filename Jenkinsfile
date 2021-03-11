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
                echo "build start..."
                sh "npm serve"
                echo "build success"
            }
        }
        stage("deploy"){
            steps{
                echo "deploy packge to node1"
            }
        }
    }
}