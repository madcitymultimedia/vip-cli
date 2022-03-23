/**
 * External dependencies
 */
import SocksProxyAgent from 'socks-proxy-agent';
import HttpsProxyAgent from 'https-proxy-agent';

/**
 * Internal dependencies
 */
import createProxyAgent from 'lib/http/proxy-agent';

describe( 'proxy-agent', () => {
	describe( 'createProxyAgent()', () => {
		beforeEach( () => {
			const envVarsToClear = [ 'VIP_PROXY', 'SOCKS_PROXY', 'HTTP_PROXY', 'HTTPS_PROXY' ];

			for ( const envVar of envVarsToClear ) {
				delete process.env[ envVar ];
			}
		} );

		it( 'should not return agent when no env vars set', () => {
			const agent = createProxyAgent();

			expect( agent ).toBeNull();
		} );

		it.each( [
			[
				'VIP_PROXY',
				'socks://localhost:1234',
				SocksProxyAgent,
			],
			[
				'SOCKS_PROXY',
				'socks://localhost:1234',
				SocksProxyAgent,
			],
			[
				'HTTP_PROXY',
				'http://localhost:1234',
				HttpsProxyAgent,
			],
			[
				'HTTPS_PROXY',
				'https://localhost:1234',
				HttpsProxyAgent,
			],
		] )( 'should return correct agent when env var (%s) set', ( envVar, proxy, className ) => {
			process.env[ envVar ] = proxy;

			const agent = createProxyAgent();

			expect( agent ).toBeInstanceOf( className );
		} );
	} );
} );
