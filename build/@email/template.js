"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTemplate = void 0;
const _environment_1 = require("../@environment");
const development = process.env.NODE_ENV === "development";
const website_link = development ? _environment_1.development_frontend_url : _environment_1.production_frontend_url;
const authTemplate = (des, url, code) => `
<html>
    <body>          
        <table style="width: 100%;border-spacing: 0px;background: white;">
            <tr>
                <th style="text-align: left; font-size: 1.5rem; margin: 1rem 0">            
                    <h2>
                        <a href="${website_link}" style="text-decoration: none;color: black">${_environment_1.website_name}</a>
                    </h2>
                </th>
            </tr>
            <tr class="link">
                <td>
                <p style="color: #1F51FF; font-size: 2rem"> ${code} </p>
                <p> Your magic link </p>
                <a class="link" href="${website_link}/${url}" style="text-decoration: none; color:#1F51FF; font-size: 2rem; border-bottom: 1px solid #1F51FF"> ${des}</a>
                </td>
            </tr>
            <tr>
            <td>
                <p style="margin: 2rem 0">
                    If you did not request this email, please delete or ignore.
                </p> 
            </td>
            </tr>
            <tr>
                <td style="height: 50px;">
                    <footer style="margin-top: 5rem; text-align: center; padding: 0.5rem; border-top: 1px solid black">
                    Automated email <br/>
                    please do not reply to this email. 
                    </footer>
                </td>
            </tr>
        </table>
    </body>
</html>
`;
exports.authTemplate = authTemplate;
