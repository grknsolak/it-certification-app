import { Exam } from '../types';

export const certificationExams: Exam[] = [
  {
    id: 'aws-cp',
    title: 'AWS Certified Cloud Practitioner',
    description: 'Foundational understanding of AWS Cloud - Temel AWS Cloud bilgisi',
    timeLimit: 90,
    passingScore: 70,
    category: 'Cloud Computing',
    subCategory: 'AWS',
    icon: '☁️',
    createdAt: new Date(),
    questions: [
      {
        id: 'aws-cp-1',
        question: 'Which AWS service provides a managed DNS service?',
        options: [
          'Amazon Route 53',
          'Amazon CloudFront',
          'Amazon VPC',
          'Amazon Direct Connect'
        ],
        correctAnswer: 0,
        explanation: 'Amazon Route 53 is AWS\'s scalable Domain Name System (DNS) web service.',
        category: 'Networking',
        difficulty: 'easy'
      },
      {
        id: 'aws-cp-2',
        question: 'A company needs to assess application vulnerabilities. Which AWS service should they use?',
        options: [
          'AWS Trusted Advisor',
          'Amazon Inspector',
          'AWS Config',
          'Amazon GuardDuty'
        ],
        correctAnswer: 1,
        explanation: 'Amazon Inspector automatically assesses applications for vulnerabilities and deviations from best practices.',
        category: 'Security',
        difficulty: 'medium'
      },
      {
        id: 'aws-cp-3',
        question: 'According to best practices, how should an EC2 instance access an S3 bucket?',
        options: [
          'Hard code IAM user credentials in the application',
          'Store credentials in a text file on EC2',
          'Have the EC2 instance assume an IAM role',
          'Make the S3 bucket public'
        ],
        correctAnswer: 2,
        explanation: 'Using IAM roles is the most secure method. Roles provide temporary credentials.',
        category: 'Security',
        difficulty: 'medium'
      },
      {
        id: 'aws-cp-4',
        question: 'Which AWS service provides serverless compute?',
        options: [
          'Amazon EC2',
          'Amazon Lambda',
          'Amazon ECS',
          'Amazon Lightsail'
        ],
        correctAnswer: 1,
        explanation: 'AWS Lambda lets you run code without provisioning or managing servers.',
        category: 'Compute',
        difficulty: 'easy'
      },
      {
        id: 'aws-cp-5',
        question: 'What is the main purpose of Amazon S3?',
        options: [
          'Run virtual machines',
          'Object storage',
          'Relational database',
          'Content delivery'
        ],
        correctAnswer: 1,
        explanation: 'Amazon S3 is an object storage service designed to store and retrieve any amount of data.',
        category: 'Storage',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'aws-saa',
    title: 'AWS Solutions Architect Associate',
    description: 'Design and deploy scalable AWS systems - Ölçeklenebilir AWS sistemleri tasarlama',
    timeLimit: 130,
    passingScore: 72,
    category: 'Cloud Computing',
    subCategory: 'AWS',
    icon: '☁️',
    createdAt: new Date(),
    questions: [
      {
        id: 'aws-saa-1',
        question: 'What is the purpose of Amazon VPC?',
        options: [
          'Store data',
          'Create a virtual network in AWS',
          'Manage users',
          'Monitor applications'
        ],
        correctAnswer: 1,
        explanation: 'Amazon VPC lets you provision a logically isolated section of the AWS Cloud.',
        category: 'Networking',
        difficulty: 'easy'
      },
      {
        id: 'aws-saa-2',
        question: 'Which services provide auto-scaling? (Choose two)',
        options: [
          'AWS Auto Scaling',
          'Amazon S3',
          'Amazon EC2 Auto Scaling',
          'Amazon RDS'
        ],
        correctAnswer: [0, 2],
        explanation: 'AWS Auto Scaling and Amazon EC2 Auto Scaling both provide auto-scaling capabilities.',
        category: 'Compute',
        difficulty: 'medium'
      },
      {
        id: 'aws-saa-3',
        question: 'Which AWS service provides load balancing at Layer 7?',
        options: [
          'Network Load Balancer',
          'Classic Load Balancer',
          'Application Load Balancer',
          'Gateway Load Balancer'
        ],
        correctAnswer: 2,
        explanation: 'Application Load Balancer operates at Layer 7 (application layer) of the OSI model.',
        category: 'Networking',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'comptia-sec',
    title: 'CompTIA Security+ SY0-701',
    description: 'IT security fundamentals - IT güvenlik temelleri',
    timeLimit: 90,
    passingScore: 75,
    category: 'Cybersecurity',
    subCategory: 'CompTIA',
    icon: '🛡️',
    createdAt: new Date(),
    questions: [
      {
        id: 'sec-1',
        question: 'What is the primary purpose of a firewall?',
        options: [
          'Encrypt data',
          'Control network traffic',
          'Authenticate users',
          'Backup data'
        ],
        correctAnswer: 1,
        explanation: 'A firewall monitors and controls incoming and outgoing network traffic based on security rules.',
        category: 'Network Security',
        difficulty: 'easy'
      },
      {
        id: 'sec-2',
        question: 'Which encryption algorithm is considered most secure?',
        options: [
          'DES',
          '3DES',
          'AES-256',
          'MD5'
        ],
        correctAnswer: 2,
        explanation: 'AES-256 is currently the most secure widely-used encryption standard.',
        category: 'Cryptography',
        difficulty: 'medium'
      },
      {
        id: 'sec-3',
        question: 'What is social engineering?',
        options: [
          'A type of malware',
          'Manipulating people to gain confidential information',
          'A network attack method',
          'A data encryption technique'
        ],
        correctAnswer: 1,
        explanation: 'Social engineering exploits human psychology rather than technical vulnerabilities.',
        category: 'Threats',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'gcp-ace',
    title: 'Google Cloud Associate Engineer',
    description: 'Deploy and manage Google Cloud solutions - GCP çözümleri yönetme',
    timeLimit: 120,
    passingScore: 70,
    category: 'Cloud Computing',
    subCategory: 'Google Cloud',
    icon: '☁️',
    createdAt: new Date(),
    questions: [
      {
        id: 'gcp-1',
        question: 'Which Google Cloud service provides virtual machines?',
        options: [
          'Google Cloud Storage',
          'Compute Engine',
          'Cloud SQL',
          'Cloud Functions'
        ],
        correctAnswer: 1,
        explanation: 'Compute Engine provides scalable virtual machines running in Google\'s data centers.',
        category: 'Compute',
        difficulty: 'easy'
      },
      {
        id: 'gcp-2',
        question: 'What is Google Kubernetes Engine (GKE)?',
        options: [
          'A database service',
          'A managed Kubernetes service',
          'A storage service',
          'A monitoring service'
        ],
        correctAnswer: 1,
        explanation: 'GKE is a managed environment for deploying containerized applications.',
        category: 'Containers',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'cka',
    title: 'Certified Kubernetes Administrator',
    description: 'Kubernetes cluster administration - Kubernetes kümesi yönetimi',
    timeLimit: 180,
    passingScore: 66,
    category: 'Container Orchestration',
    subCategory: 'Kubernetes / CNCF',
    icon: '🐳',
    createdAt: new Date(),
    questions: [
      {
        id: 'cka-1',
        question: 'What is a Kubernetes Pod?',
        options: [
          'A virtual machine',
          'The smallest deployable unit in Kubernetes',
          'A container image',
          'A service'
        ],
        correctAnswer: 1,
        explanation: 'A Pod is the smallest deployable unit that can contain one or more containers.',
        category: 'Core Concepts',
        difficulty: 'easy'
      },
      {
        id: 'cka-2',
        question: 'Which command creates a deployment?',
        options: [
          'kubectl create deployment',
          'kubectl create pod',
          'kubectl run deployment',
          'kubectl deploy'
        ],
        correctAnswer: 0,
        explanation: 'kubectl create deployment is the standard command to create a deployment.',
        category: 'Workloads',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'terraform',
    title: 'HashiCorp Terraform Associate',
    description: 'Infrastructure as Code with Terraform - Terraform ile altyapı kodu',
    timeLimit: 60,
    passingScore: 70,
    category: 'DevOps',
    subCategory: 'Terraform / HashiCorp',
    icon: '⚙️',
    createdAt: new Date(),
    questions: [
      {
        id: 'tf-1',
        question: 'What is Terraform?',
        options: [
          'A programming language',
          'An infrastructure as code tool',
          'A database',
          'A monitoring tool'
        ],
        correctAnswer: 1,
        explanation: 'Terraform is an infrastructure as code tool for building and managing infrastructure.',
        category: 'Basics',
        difficulty: 'easy'
      },
      {
        id: 'tf-2',
        question: 'What command initializes a Terraform working directory?',
        options: [
          'terraform init',
          'terraform plan',
          'terraform apply',
          'terraform start'
        ],
        correctAnswer: 0,
        explanation: 'terraform init initializes a working directory containing Terraform configuration files.',
        category: 'Commands',
        difficulty: 'easy'
      }
    ]
  }
];

