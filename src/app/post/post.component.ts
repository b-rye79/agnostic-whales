import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = {
    _id: "mock-post-1",
    title: "Lorem ipsum dolor",
    author: "Sed Praesent",
    date: new Date(),
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in iaculis sem. In ac erat porttitor, euismod ligula vitae, pellentesque arcu. Nulla sed ex vestibulum, elementum ante pharetra, pharetra nulla. Donec porta mattis velit in fermentum. Donec accumsan venenatis libero, a accumsan augue. Etiam vel nunc ornare, vehicula justo in, aliquam tellus. Praesent eget augue dapibus, mattis lectus non, rutrum erat. Pellentesque faucibus, felis a sodales malesuada, dui mauris pellentesque quam, vel rutrum odio erat non sem. Duis ut lacus et diam blandit eleifend. Nunc justo enim, placerat eget felis ut, ultrices tincidunt ipsum. Vestibulum mattis urna ut sapien condimentum sollicitudin. Phasellus ac mauris ac dui vulputate euismod. Sed suscipit, diam non volutpat pulvinar, eros urna volutpat erat, tincidunt faucibus lacus elit id ipsum. </p><p>Duis dictum, magna non pellentesque laoreet, nisl ligula accumsan nulla, non ultricies odio nisi id magna. In sagittis elit sed blandit dignissim. Maecenas commodo accumsan mi, ac luctus mauris pellentesque sodales. In blandit lorem arcu, et tempus mi iaculis in. Mauris nec massa nec ligula consequat ullamcorper. Proin vitae diam nec massa venenatis varius. Sed sed lorem ultricies, fringilla lectus elementum, ullamcorper sem. Donec tincidunt risus at dignissim luctus. Sed malesuada leo elementum mauris egestas, vitae dignissim felis congue. Nullam varius aliquam felis, et suscipit risus aliquam bibendum. In ac mauris malesuada, tincidunt nisi sed, fringilla sapien. Maecenas augue ipsum, maximus ac blandit et, eleifend et urna. Etiam sit amet nunc volutpat, scelerisque odio sit amet, vulputate elit.</p><p>Suspendisse accumsan pellentesque nisi, non iaculis libero. Fusce dapibus finibus felis, nec vehicula mauris convallis vitae. Proin vitae vestibulum tellus. In at malesuada tellus. Proin bibendum eleifend turpis eu condimentum. Curabitur interdum ante et tempor venenatis. Nunc quis nisl viverra, viverra tortor id, tempus arcu. Maecenas condimentum purus at metus mattis, non volutpat metus maximus. Nullam id magna a neque euismod mattis ac sed justo. Vestibulum vel eros mauris. Nunc aliquet diam quis nulla semper egestas.</p><p>Aliquam gravida quam sed nisl euismod, vel hendrerit turpis porta. Duis finibus, sem at accumsan tincidunt, ante purus ornare ante, ut elementum nulla felis accumsan libero. Aliquam pulvinar leo ligula, sit amet vestibulum dui dapibus in. Nam ultricies, sem tempus sagittis porttitor, neque ex suscipit quam, a bibendum tortor augue nec felis. Aliquam viverra turpis id metus malesuada, vitae suscipit turpis consequat. Aenean quis erat suscipit, semper arcu et, hendrerit sem. Donec suscipit dui non sagittis tincidunt. Sed risus lorem, euismod sit amet velit ac, volutpat interdum ante. Maecenas vitae dapibus nibh, a consequat sem. Ut ut nisi cursus, scelerisque odio et, elementum lorem. In sagittis molestie metus at interdum.</p><p>Fusce eget lectus pharetra, hendrerit risus sed, egestas massa. Praesent purus dolor, aliquam quis felis eget, feugiat bibendum augue. Praesent viverra tortor sit amet odio tempus, at molestie lacus volutpat. Praesent et lectus elementum nisi mattis iaculis a id arcu. Aliquam non magna in massa condimentum sollicitudin at non diam. Praesent porttitor sagittis ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed interdum nisl eu orci convallis pellentesque. Phasellus eget eleifend magna, in elementum quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>"
  };
  
  constructor(){}

  ngOnInit(): void {
  }
}
