# sherlihy.com

## Description

A web application with AI chatbot that you can use to find out more about me experience and expertise.

## Motivation

I created sherlihy.com after reflecting on the work I had done for i2Group, making complex front-end features, and finding I wanted to go beyond creating features and experience delivering web applications. I chose a portfolio website as I also wanted to experience creating and maintaining a web application with an indefinate lifecycle.

## Usage

1. Visit [sherlihy.com](https://sherlihy.com)
2. Chat with the AI Chatbot
3. Click the menu in the top left to explore more
4. Use my contact details in the banner to contact me

## Infrastructure Diagram

```mermaid

    flowchart LR

    Client <--> Site
    
    subgraph namecheap
        Site[SHerlihy.com]
    end
    
    Site --> R53
    R53 --> Site

    subgraph AWS
    subgraph global
        DNS{Cloudfront}
        R53[Route 53]
        Cert[HTTPS Cert]
        
        Cert --> R53
        R53 <--> DNS
        DNS <--> Cache
        DNS <--> S3
        
        subgraph eu-west-2
            subgraph acl-public-read
                S3[S3 sherlihy.com]
            end
        end
    end
    end
    
    subgraph upload
    Actions[CI/CD Pipeline]
    Actions --> S3
    end


```
---
