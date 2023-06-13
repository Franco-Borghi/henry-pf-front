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
