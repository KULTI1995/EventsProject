import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  Injectable,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  filename: string;
  type: any;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnChanges {
  @Input() data;
  treeControl: FlatTreeControl<FileFlatNode>;

  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;

  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.treeControl = new FlatTreeControl<FileFlatNode>(
      this._getLevel,
      this._isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data = this.buildFileTree(changes.data.currentValue, 0);
    this.dataSource.data = data;
  }

  buildFileTree(value: any, level: number): FileNode[] {
    const data: any[] = [];
    // tslint:disable-next-line:forin
    for (const k in value) {
      let v = value[k];
      const node = new FileNode();
      node.filename = `${k}`;
      v instanceof Date ? (v = v.toString()) : (v = v);
      if (v === null || v === undefined) {
        // no action
      } else if (typeof v === 'object') {
        node.children = this.buildFileTree(v, level + 1);
      } else {
        node.type = v;
      }
      data.push(node);
    }
    return data;
  }

  transformer = (node: FileNode, level: number) => {
    const flatNode = new FileFlatNode();
    flatNode.filename = node.filename;
    flatNode.type = node.type;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    return flatNode;
  }

  private _getLevel = (node: FileFlatNode) => {
    return node.level;
  }

  private _isExpandable = (node: FileFlatNode) => {
    return node.expandable;
  }

  private _getChildren = (node: FileNode): Observable<FileNode[]> => {
    return observableOf(node.children);
  }

  hasChild = (_: number, _nodeData: FileFlatNode) => {
    return _nodeData.expandable;
  }
}
