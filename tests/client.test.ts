import { describe, it, expect, vi } from 'vitest';
import { VibersmoonClient } from '../src/client.js';

describe('VibersmoonClient', () => {
  it('should use default options', () => {
    const client = new VibersmoonClient();
    expect(client).toBeDefined();
  });

  it('should throw when socket is accessed before connect', () => {
    const client = new VibersmoonClient();
    expect(() => client.getSocket()).toThrow('Client is not connected. Call connect() first.');
  });
});
