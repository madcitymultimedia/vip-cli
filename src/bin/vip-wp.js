#!/usr/bin/env node
// @flow

/**
 * External dependencies
 */
import chalk from 'chalk';
import gql from 'graphql-tag';
import { stdout } from 'single-line-log';
import SocketIO from 'socket.io-client';
import IOStream from 'socket.io-stream';
const { prompt } = require('enquirer');

/**
 * Internal dependencies
 */
import API from 'lib/api';
import app from 'lib/api/app';
import command from 'lib/cli/command';
import { formatEnvironment } from 'lib/cli/format';
import { trackEvent } from 'lib/tracker';

//const socket = SocketIO( 'http://localhost:4000/wp-cli' );

const envInfo = `id,name,environments{
	id,name,defaultDomain,branch,datacenter
}`;

command( {
	appContext: true,
	appQuery: envInfo,
	childEnvContext: true,
} )
	.argv( process.argv, async ( arg, opts ) => {
		const { id: appId, name: appName } = opts.app;
		const { id: envId, name: envName } = opts.env;

		console.log( `Entering WP-CLI mode for ${ appName } (${ appId }) and ${ envName } (${ envId }) environment.` );

		while ( true ) {
			const response = await prompt( {
				type: 'input',
				name: 'command',
				message: '>',
				validate: toValidate => {
					if ( ! toValidate.startsWith( 'wp' ) ) {
						return 'The command must start with `wp`';
					}

					return true;
				},
			} );

			// Note: command would be sent to Parker here via `response.command`

			const cmd = response.command;

			if ( cmd === 'wp option get home' ) {
				console.log( `https://${ appName }.com` );
				continue;
			} else if ( cmd === 'wp user get batmoo' ) {
				console.log( '----------------------------' );
				console.log( '|  id  |  username  |  name  |' );
				console.log( '----------------------------' );
				console.log( '|  123 |   batmoo   |   Mo   |' );
				console.log( '----------------------------' );

				continue;
			}

			console.log( 'Sorry, that command is not supported.' );
			continue;
		}
	} );
