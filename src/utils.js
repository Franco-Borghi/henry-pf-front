export function convertirNumero(numero) {
  // Convertir el número a string
  let numeroString = numero.toString();

  // Verificar si el número tiene parte decimal
  if (numeroString.includes('.')) {
    // Dividir el número en parte entera y parte decimal
    let partes = numeroString.split('.');
    
    // Formatear la parte entera
    let parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Combinar la parte entera formateada con la parte decimal
    let resultado = parteEntera + ',' + partes[1];
    
    return resultado;
  } else {
    // Formatear el número entero
    let numeroFormateado = numeroString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return numeroFormateado;
  }
}

export function animateElements(idsArray, direction, once) {

  idsArray.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add(`hidden`);
    }
  });

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(`animate-appear-${direction}`);
        entry.target.classList.remove(`hidden`);
        if (once) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  idsArray.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });
}

export function animateChildElements(ids, direction, delay, executeOnce) {

  ids.forEach(id => {
    const element = document.getElementById(id);

    if (element) {
      const childrens = [...element.childNodes];

      if (childrens && childrens.length) {
        childrens.forEach(children => {
          children.classList.add('hidden');
        })
      }
    }
  })

  const observerConfig = {
    threshold: 0.5, // Porcentaje del elemento que debe ser visible para activar la animación
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const children = container.children;

        // Verificar si la animación solo se ejecuta una vez
        if (executeOnce) {
          observer.unobserve(container);
        }

        let animationDelay = 0;

        // Aplicar animación a cada hijo con un retraso personalizado
        for (let i = 0; i < children.length; i++) {
          setTimeout(() => {
            const child = children[i];
            child.classList.add(`animate-appear-${direction}`);
            child.classList.remove(`hidden`);
          }, delay * i);
        }
      }
    });
  }, observerConfig);

  // Observar los contenedores especificados por los IDs
  ids.forEach((id) => {
    const container = document.getElementById(id);
    if (container) {
      observer.observe(container);
    }
  });
}
