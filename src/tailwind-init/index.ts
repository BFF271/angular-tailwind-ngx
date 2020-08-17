import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { exec } from 'child_process';
import { Observable } from 'rxjs';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function tailwindInit(_options: any): Rule {
  return (host: Tree, _context: SchematicContext) => {
    _context.logger.info('Initialized Tailwind');
    return new Observable<Tree>((subscriber) => {
      const child = exec('npx tailwindcss init');
      child.on('error', (error) => {
        subscriber.error(error);
      });
      child.on('close', () => {
        subscriber.next(host);
        subscriber.complete();
      });
      return () => {
        child.kill();
        return host;
      };
    });
  };
}
