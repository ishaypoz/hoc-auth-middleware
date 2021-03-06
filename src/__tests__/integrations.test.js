import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';
beforeEach(() => {
	moxios.install();
	moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
		status: 200,
		response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }]
	});
});
afterEach(() => {
	moxios.uninstall();
});
//inorder to tell jest to wait to settimeout we use done callback
it('can fetch a list of comments and display them', (done) => {
	const wrapped = mount(
		<Root>
			<App />
		</Root>
	);
	wrapped.find('.fetch-comments').simulate('click');
	setTimeout(() => {
		wrapped.update();
		expect(wrapped.find('li').length).toEqual(2);
		done(); //to let jest wait for moxios
		wrapped.unmount();
	});
});
