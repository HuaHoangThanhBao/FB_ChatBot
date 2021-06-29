## Clone

```console
$ git clone ...
```

## How to install?

[Create Facebook App](https://developers.facebook.com/apps/)

1. Create a new Facbook application with business type.
2. Add messenger product to your app.
3. Create access token for your app.

[Create Heroku app](https://heroku.com/)
1. Create new Heroku application.
2. Edit config'variables by passing all names and values in your .env file.

## Set-up

1. On your Facebook page, you create a new button with chat type.
2. In your project, change access token varibale in .env file.
3. Pass your Heroku app's link (yourUrl/webhook) and your access token to Facebook's webhook.
4. Choose type of your webhook (messages, messaging_postbacks, messaging_handovers).

## Publishing

After following above steps, you have to send an approval to Facebook to identify you app. Then 
your bot will work perfectly.