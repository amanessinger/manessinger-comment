# A Web Component for Submitting Comments

## Introduction

This is a [Stencil](https://stenciljs.com/)-based web component intended 
to support the submission of comments to an otherwise static blog
implemented with [Hugo](https://gohugo.io/).

The web component is embedded into a special *Contact* page, that 
is opened in a separate frame whenever a comment on the blog post 
is requested. Which post or which comment the new comment replies to,
that is indicated by the URL fragment of the *Contact* page.

As the requesting blog lacks a proper backend (it's static after all),
the comments are submitted to an 
[Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) 
message queue.