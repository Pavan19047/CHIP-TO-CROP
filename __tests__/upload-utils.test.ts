import { validateImageFile, calculateFileHash } from '@/lib/upload-utils';

describe('Upload Utils', () => {
  describe('validateImageFile', () => {
    it('accepts valid JPEG files', () => {
      const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB
      
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('rejects files larger than 10MB', () => {
      const file = new File(['dummy'], 'large.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 11 * 1024 * 1024 }); // 11MB
      
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('too large');
    });

    it('rejects invalid file types', () => {
      const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
      Object.defineProperty(file, 'size', { value: 1024 });
      
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid file type');
    });

    it('accepts PNG files', () => {
      const file = new File(['dummy'], 'test.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 2 * 1024 * 1024 }); // 2MB
      
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
    });

    it('accepts WebP files', () => {
      const file = new File(['dummy'], 'test.webp', { type: 'image/webp' });
      Object.defineProperty(file, 'size', { value: 3 * 1024 * 1024 }); // 3MB
      
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
    });
  });

  describe('calculateFileHash', () => {
    it('generates consistent hash for same content', async () => {
      const content = 'test content';
      const file1 = new File([content], 'test1.txt', { type: 'text/plain' });
      const file2 = new File([content], 'test2.txt', { type: 'text/plain' });
      
      const hash1 = await calculateFileHash(file1);
      const hash2 = await calculateFileHash(file2);
      
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 produces 64 hex characters
    });

    it('generates different hashes for different content', async () => {
      const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
      const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });
      
      const hash1 = await calculateFileHash(file1);
      const hash2 = await calculateFileHash(file2);
      
      expect(hash1).not.toBe(hash2);
    });
  });
});
