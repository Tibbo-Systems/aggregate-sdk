pipeline {
    agent any
    options {
        timeout(time: 15, unit: 'MINUTES')
    }
    stages {
        stage('Install') {
            steps {
                dir("$WORKSPACE/AggreGate/projects/frontend/typescript-api/") {
                    bat 'npm ci'
                }
            }
        }
        stage('Audit') {
            steps {
                dir("$WORKSPACE/AggreGate/projects/frontend/typescript-api/") {
                    bat 'npm audit fix'
                }
            }
        }
        stage('Tests') {
            steps {
                dir("$WORKSPACE/AggreGate/projects/frontend/typescript-api/") {
                    bat 'npm run test'
                }
            }
            post {
                always {
                    junit 'AggreGate/projects/frontend/typescript-api/test-reports/test-jest.xml'
                    publishHTML target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: false,
                            keepAll: true,
                            reportDir            : 'AggreGate/projects/frontend/typescript-api/test-reports',
                            reportFiles          : 'test-jest.html',
                            reportName           : 'TS Tests HTML Report'
                    ]
                }
            }
        }
        stage('Build') {
            steps {
                dir("$WORKSPACE/AggreGate/projects/frontend/typescript-api/") {
                    bat 'npm run build'
                }
            }
        }
    }
}

def notifyBuildStatus() {
    GString subject = "Jenkins build '${env.JOB_NAME} [${env.BUILD_NUMBER}]': ${currentBuild.currentResult}"
    GString details = "Check console output at ${env.BUILD_URL}"

    //Sending email to the build engineer
    emailext(
        subject: subject,
        body: details,
        to: 'andrey.plis@tibbo.com'
    )
}