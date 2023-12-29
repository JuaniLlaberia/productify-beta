export const welcomeEmailTemplate = (name?: string) => {
  return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style media="all" type="text/css">
  
                body {
                font-family: Helvetica, sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 16px;
                line-height: 1.3;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                }
                
                table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%;
                }
                
                table td {
                font-family: Helvetica, sans-serif;
                font-size: 16px;
                vertical-align: top;
                }
                
                body {
                background-color: #f4f5f6;
                margin: 0;
                padding: 0;
                }
                
                .body {
                background-color: #f4f5f6;
                width: 100%;
                }
                
                .container {
                margin: 0 auto !important;
                max-width: 600px;
                padding: 0;
                padding-top: 24px;
                width: 600px;
                }
                
                .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 600px;
                padding: 0;
                }
                
                .main {
                background: #ffffff;
                border: 1px solid #eaebed;
                border-radius: 16px;
                width: 100%;
                }
                
                .wrapper {
                box-sizing: border-box;
                padding: 24px;
                }
                
                .footer {
                clear: both;
                padding-top: 24px;
                text-align: center;
                width: 100%;
                }
                
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                color: #9a9ea6;
                font-size: 16px;
                text-align: center;
                }
                
                p {
                font-family: Helvetica, sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 16px;
                opacity: 0.90;
                }
                
                .btn {
                box-sizing: border-box;
                min-width: 100% !important;
                width: 100%;
                }
                
                .btn > tbody > tr > td {
                padding-bottom: 16px;
                }
                
                .btn table {
                width: auto;
                }
                
                .btn table td {
                background-color: #ffffff;
                border-radius: 4px;
                text-align: center;
                }
                
                .btn-primary table td {
                background-color: #ac50e6;
                color: #f9f7fa;
                font-weight: bold;
                padding: 0.5rem 1rem 0.5rem 1rem;
                }
                
                @media all {
                .btn-primary table td:hover {
                    background-color: #ec0867 !important;
                }
                .btn-primary a:hover {
                    background-color: #ec0867 !important;
                    border-color: #ec0867 !important;
                }
                }
                
                .last {
                margin-bottom: 0;
                }
                
                .first {
                margin-top: 0;
                }
                
                .align-center {
                text-align: center;
                }
                
                .align-right {
                text-align: right;
                }
                
                .align-left {
                text-align: left;
                }
                
                .text-link {
                color: #0867ec !important;
                text-decoration: underline !important;
                }
                
                .clear {
                clear: both;
                }
                
                .mt0 {
                margin-top: 0;
                }
                
                .mb0 {
                margin-bottom: 0;
                }
                
                .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0;
                }
                
                .powered-by a {
                text-decoration: none;
                }
                
                @media only screen and (max-width: 640px) {
                .main p,
                .main td,
                .main span {
                    font-size: 16px !important;
                }
                .wrapper {
                    padding: 8px !important;
                }
                .content {
                    padding: 0 !important;
                }
                .container {
                    padding: 0 !important;
                    padding-top: 8px !important;
                    width: 100% !important;
                }
                .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                }
                .btn table {
                    max-width: 100% !important;
                    width: 100% !important;
                }
                .btn a {
                    font-size: 16px !important;
                    max-width: 100% !important;
                    width: 100% !important;
                }
                }
                
                @media all {
                .ExternalClass {
                    width: 100%;
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                }
                .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                }
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                }
                }
            </style>
        </head>
        <body>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
                <td>&nbsp;</td>
                <td class="container">
                <div class="content">
                    <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                    <tr>
                        <td class="wrapper">
                        <h5>Welcome to X</h5>
                        <p>${name ? `Hi ${name}` : 'Hello there'},</p>
                        <p>Your account has been created, you can edit your date in the settings.</p>
                        <p>Start organizing your work and life [description]</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                            <tr>
                                <td align="left">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                        <td><span style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}><a href='' style={{text-decoration: 'none'}}> Join Now </a></span></td>
                                    </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                <td>&nbsp;</td>
            </tr>
            </table>
        </body>
    </html>
        `;
};
