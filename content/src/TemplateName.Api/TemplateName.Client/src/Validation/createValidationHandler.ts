interface BadRequestResponse {
  [field: string]: string[];
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export const createValidationHandler = (url: string) => async (values: any) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'content-type': 'application/json' },
  });

  if (response.ok) {
    return;
  }
  if (response.status === 400) {
    const data: BadRequestResponse = await response.json();
    const errors = {};
    Object.keys(data).forEach(key => {
      errors[camelize(key)] = data[key];
    });

    if (Object.keys(errors).length) {
      throw errors;
    }
  }
};
