import Link from 'next/link';
import Rail from './components/Rail';

/* Framed as process output rather than an apology. Same rail, same grid, so a
   dead URL does not drop the reader out of the world the rest of the site
   builds. 44 is not an arbitrary number - it is the HTTP status, which is the
   joke. */
export const metadata = {
  title: 'exit code 44 · no such section',
};

export default function NotFound() {
  return (
    <>
      <Rail />
      <section className="shell band" id="top">
        <div className="well g12">
          <div className="nf">
            <p className="nf-code">exit code 44</p>
            <h1 className="nf-title">No such section</h1>
            <p className="nf-body">
              The path you asked for is not part of this build. Nothing was
              logged, nothing broke.
            </p>
            <div className="c-links">
              <Link href="/">-&gt; home</Link>
              <Link href="/#build">-&gt; build</Link>
              <Link href="/#contact">-&gt; contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
