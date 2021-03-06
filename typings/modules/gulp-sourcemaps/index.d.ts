// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-vinyl/13670eff75aba7b4c95546ec9eebbb72e3537188/index.d.ts
declare module '~gulp-sourcemaps~vinyl' {

import * as fs from 'fs';

namespace File {
    export interface FileOptions {

        /**
         * Default: process.cwd()
         */
        cwd?: string;

        /**
         * Used for relative pathing. Typically where a glob starts.
         */
        base?: string;

        /**
         * Full path to the file.
         */
        path?: string;

        /**
         * Path history. Has no effect if options.path is passed.
         */
        history?: string[];

        /**
         * The result of an fs.stat call. See fs.Stats for more information.
         */
        stat?: fs.Stats;

        /**
         * File contents.
         * Type: Buffer, Stream, or null
         */
        contents?: Buffer | NodeJS.ReadWriteStream;
    }

    export interface PipeOptions {
        /**
         * If false, the destination stream will not be ended (same as node core).
         */
        end?: boolean;
    }
}

/**
 * A virtual file format.
 */
class File {
    constructor(options?: File.FileOptions);

    /**
     * Default: process.cwd()
     */
    public cwd: string;

    /**
     * Used for relative pathing. Typically where a glob starts.
     */
    public dirname: string;
    public basename: string;
    public base: string;

    /**
     * Full path to the file.
     */
    public path: string;
    public stat: fs.Stats;

    /**
     * Gets and sets stem (filename without suffix) for the file path.
     */
    public stem: string;

    /**
     * Gets and sets path.extname for the file path
     */
    public extname: string;

    /**
     * Array of path values the file object has had
     */
    public history: string[];

    /**
     * Type: Buffer|Stream|null (Default: null)
     */
    public contents: Buffer | NodeJS.ReadableStream;

    /**
     * Returns path.relative for the file base and file path.
     * Example:
     *  var file = new File({
     *    cwd: "/",
     *    base: "/test/",
     *    path: "/test/file.js"
     *  });
     *  console.log(file.relative); // file.js
     */
    public relative: string;

    /**
     * Returns true if file.contents is a Buffer.
     */
    public isBuffer(): boolean;

    /**
     * Returns true if file.contents is a Stream.
     */
    public isStream(): boolean;

    /**
     * Returns true if file.contents is null.
     */
    public isNull(): boolean;

    /**
     * Returns a new File object with all attributes cloned. Custom attributes are deep-cloned.
     */
    public clone(opts?: { contents?: boolean, deep?: boolean }): File;

    /**
     * If file.contents is a Buffer, it will write it to the stream.
     * If file.contents is a Stream, it will pipe it to the stream.
     * If file.contents is null, it will do nothing.
     */
    public pipe<T extends NodeJS.ReadWriteStream>(stream: T, opts?: File.PipeOptions): T;

    /**
     * Returns a pretty String interpretation of the File. Useful for console.log.
     */
    public inspect(): string;

    /**
     * Checks if a given object is a vinyl file.
     */
    public static isVinyl(obj: any): boolean;
}

export = File;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/natevecc/typed-gulp-sourcemaps/cf9ea28864e083acc4adc46caddb407bfbb6836d/2.0.0-alpha/index.d.ts
declare module 'gulp-sourcemaps' {
// Type definitions for gulp-sourcemaps v2.0.0-alpha
// Project: https://github.com/floridoo/gulp-sourcemaps
// Original Definitions by: Asana <https://asana.com>

import * as File from '~gulp-sourcemaps~vinyl';

export interface InitOptions {
  loadMaps?: boolean;
  identityMap?: boolean;
  debug?: boolean;
}

export interface WriteMapper {
  (file: string): string;
}

export interface WriteFileMapper {
  (file: File): string;
}

export interface WriteOptions {
  addComment?: boolean;
  includeContent?: boolean;
  sourceRoot?: string | WriteMapper;
  destPath?: string;
  sourceMappingURLPrefix?: string | WriteMapper;
  sourceMappingURL?: WriteFileMapper;
  mapFile?: WriteMapper;
  mapSources?: WriteMapper;
  debug?: boolean;
  charset?: string;
}

export function init(opts?: InitOptions): NodeJS.ReadWriteStream;
export function write(path?: string, opts?: WriteOptions): NodeJS.ReadWriteStream;
export function write(opts?: WriteOptions): NodeJS.ReadWriteStream;
}
