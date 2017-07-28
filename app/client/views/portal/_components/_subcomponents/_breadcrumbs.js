TemplateController('portalBreadcrumbs', {
  helpers: {
    crumbs() {
      const currentName = Router.current().route.getName();
      const crumbs = currentName.split('.');
      const routeNames = [];
      let count = 1;
  
      for(let i = crumbs.length -1; i >= 0; i--) {
        const name = crumbs.join('.');
        crumbs.pop();
        Router.routes.forEach((route) => {
          if(route.getName() === name) {
            routeNames.push({
              label: route.options.title,
              url: route.url(),
              active: count === 1 ? 'active' : ''
            });
            
            count++;
          }
        })
      }
      routeNames.reverse();
      return routeNames;
    }
  }
})