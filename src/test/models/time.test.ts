import * as assert from 'assert';
import Time from '../../models/time';

suite('Time', () => {
    test('fromMilliseconds', () => {
        assert.ok(Time.fromMilliseconds(123).equals(new Time(0, 0, 0, 123)));
        assert.ok(Time.fromMilliseconds(1234).equals(new Time(0, 0, 1, 234)));
        assert.ok(Time.fromMilliseconds(123456).equals(new Time(0, 2, 3, 456)));
        assert.ok(Time.fromMilliseconds(123456789).equals(new Time(34, 17, 36, 789)));
    });
});