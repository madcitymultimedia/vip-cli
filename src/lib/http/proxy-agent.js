/**
 * External dependencies
 */
import SocksProxyAgent from 'socks-proxy-agent';
import HttpsProxyAgent from 'https-proxy-agent';
import debugLib from 'debug';

/**
 * Internal dependencies
 */

const debug = debugLib( '@automattic/vip:lib:http:proxy-agent' );

export default function createProxyAgent() {
	const socksProxy = process.env.VIP_PROXY || process.env.SOCKS_PROXY;
	if ( socksProxy ) {
		debug( `Enabling SOCKS proxy support using config: ${ socksProxy }` );

		return new SocksProxyAgent( socksProxy );
	}

	const httpProxy = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
	if ( httpProxy ) {
		debug( `Enabling HTTPS proxy support using config: ${ httpProxy }` );

		return new HttpsProxyAgent( httpProxy );
	}

	return null;
}
