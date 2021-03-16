
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
                sh "npm i -g serve"
                sh "cd dist"
                sh "serve -l 6666"
//                sh "tar -zcvf dist.tar.gz ./dist"
                echo "build success"
            }
        }
        stage("deploy"){
            steps{
                echo "deploy packge to fronted"
                sh "rm -rf /usr/local/fronted/*"
//                sshPublisher(publishers: [sshPublisherDesc(configName: 'kg666', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'nohup sh /usr/local/backend/start.sh', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'usr/local/backend/', remoteDirectorySDF: false, removePrefix: 'target', sourceFiles: 'target/Backend-COIN-1.0-SNAPSHOT.jar', usePty: true)], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
                echo "deploy success"
            }
        }
    }
}